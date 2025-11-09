import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import {Button, IconButton, useTheme} from "@mui/material";
import {useTour} from "@reactour/tour";
import {type Dispatch} from "react";
import type {CustomStepType} from "../config/onboarding/steps.ts";

interface navigationProps{
    steps: CustomStepType[];
    currentStep: number;
    setCurrentStep: Dispatch<React.SetStateAction<number>>;
}

export function CustomTourNavigation({currentStep, steps, setCurrentStep}: navigationProps) {
    const theme = useTheme();
    const {setIsOpen} = useTour();
    const step = steps[currentStep];
    const isLastStep = currentStep === steps.length - 1;

    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 20px'
            }}>
                <div style={{flex: 1, display: 'flex', justifyContent: 'flex-start'}}>
                    {!step.hidePrevious && (
                        <IconButton onClick={() => setCurrentStep(currentStep - 1)}
                                    disabled={currentStep === 0}>
                            <NavigateBeforeIcon/>
                        </IconButton>
                    )}
                </div>

                <div style={{flex: 1, display: 'flex', justifyContent: 'center', gap: 8}}>
                    {steps.map((_, index) => (
                        <div
                            key={index}
                            style={{
                                width: 12,
                                height: 12,
                                borderRadius: '50%',
                                backgroundColor: index === currentStep ? theme.palette.primary.main : '#c4c4c4',
                                cursor: 'pointer',
                            }}
                            aria-label={`Step ${index + 1}`}
                        />
                    ))}
                </div>

                <div style={{flex: 1, display: 'flex', justifyContent: 'flex-end'}}>
                    {!isLastStep && !step.hideNext && currentStep < steps.length - 1 && (
                        <IconButton onClick={() => setCurrentStep(currentStep + 1)}>
                            <NavigateNextIcon/>
                        </IconButton>
                    )}
                </div>
            </div>

            {/* Button row separated */}
            {isLastStep &&
                <div style={{padding: '10px 20px'}}>
                    <Button variant="contained"
                            color="primary"
                            onClick={() => setIsOpen(false)}
                            fullWidth>
                        Introductie beëindigen
                    </Button>
                </div>
            }
        </div>
    );
}

