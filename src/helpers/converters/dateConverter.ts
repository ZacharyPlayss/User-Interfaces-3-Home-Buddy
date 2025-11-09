import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);


export function parseTimeToUTCDate(timeStr: string): Date {
    const now = dayjs();
    const localDateTime = dayjs(`${now.format("YYYY-MM-DD")}T${timeStr}`);
    return localDateTime.utc().toDate();
}

export function convertDateToUTC(dateObj: Date): Date {
    return dayjs(dateObj).utc().toDate();
}

export function checkDateRangeOverlap(start1: Date, end1: Date, start2: Date, end2: Date) {
    const getMinutes = (date: Date) => dayjs(date).hour() * 60 + dayjs(date).minute();
    const s1 = getMinutes(start1);
    const e1 = getMinutes(end1);
    const s2 = getMinutes(start2);
    const e2 = getMinutes(end2);
    const overlap = s1 < e2 && e1 > s2;
    console.log(
        `Checking overlap: [${dayjs(start1).format("HH:mm")}-${dayjs(end1).format("HH:mm")}] with [${dayjs(start2).format("HH:mm")}-${dayjs(end2).format("HH:mm")}] -> ${overlap}`
    );
    return overlap;
}