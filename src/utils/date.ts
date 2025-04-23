import { parseAbsoluteToLocal } from "@internationalized/date";
import { DateValue } from "@nextui-org/react";

export const toDateStandard = (date: DateValue): string => {
    const year = date.year;
    const month = String(date.month).padStart(2, '0');
    const day = String(date.day).padStart(2, '0');

    const hour = "hour" in date ? String(date.hour).padStart(2, '0') : '00';
    const minute = "minute" in date ? String(date.minute).padStart(2, '0') : '00';
    const second = "second" in date ? String(date.second).padStart(2, '0') : '00';

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};

export const toInputDate = (date: string) => {
    return parseAbsoluteToLocal(`${date.replace(" ", "T")}+07:00`)
};
