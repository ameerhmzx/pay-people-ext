import { registerAuthService } from "@/entrypoints/background/auth/auth-service.ts";
import { registerClockService } from "@/entrypoints/background/clock/clock-service.ts";
import { registerTimesheetService } from "@/entrypoints/background/timesheet/timesheet-service.ts";

export default defineBackground(() => {});

registerAuthService();
registerClockService();
registerTimesheetService();
