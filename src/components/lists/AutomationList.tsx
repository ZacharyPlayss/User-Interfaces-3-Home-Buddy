import {List, ListItemButton, ListItemText} from "@mui/material";
import type {Automation} from "../../model/Automation.ts";

interface AutomationListProps {
    automations: Automation[],
    updateSelectedAutomation: (automationId: string) => void
}

export function AutomationList({automations, updateSelectedAutomation}: AutomationListProps) {
    return (
        <>
            <List>
                {automations.map((automation) => (
                    <ListItemButton key={automation.id} onClick={() => updateSelectedAutomation(automation.id)}>
                        <ListItemText primary={`Automation: ${automation.id}`}/>
                    </ListItemButton>
                ))}
            </List>
        </>
    )
}