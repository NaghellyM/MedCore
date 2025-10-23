import React from "react";
import { Label } from "../../../components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover";
import { Button } from "../../../components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "../../../components/ui/calendar";
import { Input } from "../../../components/ui/input";

type CalendarEventProps = {
    value?: string | Date;
    onChange: (iso: string) => void;
    defaultTime?: string; 
};

function toDate(value?: string | Date): Date | undefined {
    if (!value) return undefined;
    try { return typeof value === "string" ? new Date(value) : value; }
    catch { return undefined; }
}

function toTimeStr(d?: Date): string {
    if (!d) return "";
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    const ss = String(d.getSeconds()).padStart(2, "0");
    return `${hh}:${mm}:${ss}`;
}

function combine(date?: Date, timeStr?: string): string | null {
    if (!date || !timeStr) return null;
    const [hh, mm, ss = "00"] = timeStr.split(":");
    const out = new Date(date);
    out.setHours(Number(hh) || 0, Number(mm) || 0, Number(ss) || 0, 0);
    return out.toISOString();
}

export default function CalendarEvent({ value, onChange, defaultTime = "10:30:00" }: CalendarEventProps) {
    const [open, setOpen] = React.useState(false);
    const parsed = toDate(value);
    const [date, setDate] = React.useState<Date | undefined>(parsed ? new Date(parsed) : undefined);
    const [time, setTime] = React.useState<string>(parsed ? toTimeStr(parsed) : defaultTime);

    React.useEffect(() => {
        const d = toDate(value);
        setDate(d ? new Date(d) : undefined);
        setTime(d ? toTimeStr(d) : defaultTime);
    }, [value, defaultTime]);

    const emit = (nextDate?: Date, nextTime?: string) => {
        const iso = combine(nextDate ?? date, nextTime ?? time);
        if (iso) onChange(iso);
    };

    return (
        <div className="flex gap-4">
            <div className="flex flex-col gap-3">
                <Label htmlFor="date-picker" className="px-1">
                    Fecha de la consulta
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            id="date-picker"
                            className="w-40 justify-between font-normal"
                        >
                            {date ? date.toLocaleDateString() : "30/10/2025"}
                            <ChevronDownIcon />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                        <Calendar
                            className="bg-white"
                            mode="single"
                            selected={date}
                            captionLayout="dropdown"
                            onSelect={(d) => {
                                setDate(d);
                                setOpen(false);
                                emit(d, undefined); 
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>

            <div className="flex flex-col gap-3">
                <Label htmlFor="time-picker" className="px-1">
                    Hora de la consulta
                </Label>
                <Input
                    type="time"
                    id="time-picker"
                    step="1"
                    value={time}
                    onChange={(e) => {
                        const t = e.target.value; 
                        setTime(t);
                        emit(undefined, t); 
                    }}
                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
            </div>
        </div>
    );
}
