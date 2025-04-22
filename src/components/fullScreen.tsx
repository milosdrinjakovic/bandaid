import { TText } from "@/app/models/text";
import { useEffect, useRef, useState } from "react";
import { FullScreen, FullScreenHandle, useFullScreenHandle } from "react-full-screen";
import { TertiaryButton } from "./ui/button";
import { ArrowLeftIcon, ArrowRightIcon, MinusIcon, PlusIcon } from "lucide-react";

type FullScreenProps = {
    texts?: TText[]
    selectedText: Partial<TText>
    handleFullScreen: FullScreenHandle
}

const FullScreenComponent = (props: FullScreenProps) => {

    const { texts, selectedText, handleFullScreen } = props;
    const [text, setText] = useState<Partial<TText>>();
    const [isScrolling, setIsScrolling] = useState(true);
    const [scrollSpeed, setScrollSpeed] = useState(10);

    const scrollRef = useRef(null);

    useEffect(() => {
        setText(selectedText)
        setScrollSpeed(selectedText.scrollSpeed || 10)
    }, [])

    useEffect(() => {
        setText(selectedText)
    },[selectedText])

    useEffect(() => {
        setScrollSpeed(text?.scrollSpeed || 10)
        if (scrollRef.current) {
            const scrollElement: HTMLElement = scrollRef.current;
            scrollElement.scrollTop = 0;
        }
        setIsScrolling(true)
    }, [text])

    useEffect(() => {
        if (!scrollRef.current) {
            return;
        }

        const scrollElement: HTMLElement = scrollRef.current;
        let scrollInterval;

        const startScrolling = () => {
            scrollInterval = setInterval(() => {
                if (scrollElement.scrollTop + scrollElement.clientHeight < scrollElement.scrollHeight) {
                    scrollElement.scrollTop += 1; // Increment scroll
                }
            }, 1000 / scrollSpeed);
        };

        if (isScrolling) {
            startScrolling();
        }

        return () => clearInterval(scrollInterval); // Cleanup
    }, [handleFullScreen.active, isScrolling, scrollSpeed]);

    function removeBackgroundColors(html) {
        // Create a temporary DOM element to manipulate the HTML
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;

        // Remove inline background color styles
        tempDiv.querySelectorAll("*").forEach((el: HTMLElement) => {
            if (el.style.backgroundColor) {
                el.style.backgroundColor = ""; // Reset background color
            }
            if (el.style.color) {
                el.style.color = "white"; // Set text color
            }
        });

        // Remove CSS classes related to background colors (optional, depends on class naming conventions)
        tempDiv.querySelectorAll("[class]").forEach((el) => {
            el.classList.forEach((cls) => {
                if (/bg-|background/i.test(cls)) {
                    el.classList.remove(cls);
                }
            });
        });

        return tempDiv.innerHTML;
    }

    const goToNextText = () => {
        var nextTextOrderNumber = text?.order?.valueOf() ? text.order + 1 : null;
        if (nextTextOrderNumber) {
            const nextText = texts?.find(text => text.order === nextTextOrderNumber)
            if (nextText) {
                setText(nextText);
            }
        }
    }

    const goToPreviousText = () => {
        var previousTextOrderNumber = text?.order?.valueOf() ? text.order - 1 : null;
        if (previousTextOrderNumber?.valueOf) {
            const prevText = texts?.find(text => text.order === previousTextOrderNumber)
            if (prevText) {
                setText(prevText);
            }
        }
    }

    const handleSpeedSlower = () => {
        let newScrollSpeed = scrollSpeed <= 20 ? 20 : scrollSpeed - 20;
        setScrollSpeed(newScrollSpeed);
    }

    const handleSpeedFaster = () => {
        let newScrollSpeed = scrollSpeed >= 280 ? 300 : scrollSpeed + 20;
        setScrollSpeed(newScrollSpeed);
    }

    return (
        <FullScreen handle={handleFullScreen}>
            {handleFullScreen.active && text?.content ?
                <div
                    ref={scrollRef}
                    onClick={() => setIsScrolling(!isScrolling)}
                    className="overflow-auto text-2xl md:text-5xl pt-24 pb-10 h-full px-2 md:p-20 select-none"
                    dangerouslySetInnerHTML={{ __html: removeBackgroundColors(text.content) }} />
                : null}

            {/* Floating Buttons */}
            {handleFullScreen.active && (
                <>
                    {
                        <div className="flex absolute top-5 right-10 gap-4">
                            <TertiaryButton
                                icon={<MinusIcon />}
                                label="Slower"
                                iconPosition="left"
                                onClick={handleSpeedSlower}
                            />
                            <TertiaryButton
                                icon={<PlusIcon />}
                                label="Faster"
                                iconPosition="right"
                                onClick={handleSpeedFaster}
                            />
                        </div>
                    }

                    {texts && text?.order?.valueOf() !== 1 &&
                        <TertiaryButton
                            icon={<ArrowLeftIcon />}
                            label="Previous"
                            iconPosition="left"
                            onClick={goToPreviousText}
                            className="absolute bottom-5 left-10"
                        />
                    }

                    {texts && text?.order?.valueOf() !== texts.length &&
                        <TertiaryButton
                            icon={<ArrowRightIcon />}
                            label="Next"
                            iconPosition="right"
                            onClick={goToNextText}
                            className="absolute bottom-5 right-10"
                        />
                    }
                </>
            )}

        </FullScreen>
    )
}

export default FullScreenComponent;