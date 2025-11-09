import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import type {Automation} from "../../model/Automation.ts";

dayjs.extend(utc);

export function sortAutomations(automations: Automation[]): Automation[] {
    const now = dayjs.utc();

    return automations.slice().sort((a, b) => {
        const aStart = dayjs.utc(a.start);
        const aEnd = dayjs.utc(a.end);
        const bStart = dayjs.utc(b.start);
        const bEnd = dayjs.utc(b.end);

        const aActive = now.isAfter(aStart) && now.isBefore(aEnd) || now.isSame(aStart) || now.isSame(aEnd);
        const bActive = now.isAfter(bStart) && now.isBefore(bEnd) || now.isSame(bStart) || now.isSame(bEnd);

        if (aActive && !bActive) return -1;
        if (!aActive && bActive) return 1;

        const aDiff = Math.abs(aStart.diff(now));
        const bDiff = Math.abs(bStart.diff(now));

        return aDiff - bDiff;
    });
}