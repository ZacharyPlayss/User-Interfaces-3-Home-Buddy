import {useState} from "react";
import {Box} from "@mui/material";
import {useSwipeable} from "react-swipeable";

interface CarouselProps {
    children: React.ReactNode[];
}

export function Carousel({ children }: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const count = children.length;

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? count - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === count - 1 ? 0 : prev + 1));
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => handleNext(),
        onSwipedRight: () => handlePrevious()
    });

    return (
        <Box  {...handlers} sx={{ position: "relative", width: "100%", maxWidth: 750 }}>
            {children[currentIndex]}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 1,
                    mt: 1,
                }}
            >
                {children.map((_, index) => (
                    <Box
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        sx={{
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            bgcolor: currentIndex === index ? "primary.main" : "grey.400",
                            cursor: "pointer",
                            transition: "background-color 0.3s",
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
}
