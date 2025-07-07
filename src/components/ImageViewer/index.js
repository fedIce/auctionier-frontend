'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function ImageViewer({ images, open, onClose }) {



    if (!open) return null; // Don't render if not open)

    const [current, setCurrent] = useState(0);
    const touchStartX = useRef(null);
    const touchEndX = useRef(null);
    const total = images.length;
    const searchParams = useSearchParams();




    const nextSlide = () => setCurrent((prev) => (prev + 1) % total);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + total) % total);

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;
        const diff = touchStartX.current - touchEndX.current;
        if (diff > 50) nextSlide();       // swipe left
        if (diff < -50) prevSlide();      // swipe right
    };

    useEffect(() => {
        const openIndex = parseInt(searchParams.get('i')) || 0; // Get index from query string, default to 0

        console.log('ImageViewer mounted', openIndex);
        if (openIndex !== undefined && openIndex >= 0 && openIndex < total) {
            setCurrent(openIndex);
        } else {
            setCurrent(0); // Reset to first slide if index is invalid
        }
    }, []); // Reset current when openIndex changes

    // Detect dialog open from query string


    return (
        <div className='flex flex-col items-center justify-center min-h-screen w-screen top-0 left-0 fixed bg-background z-50'>
            <div className='max-w-4xl w-full h-full'>
                <div className="relative w-full overflow-hidden h-[100vh]">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${current * 100}%)` }}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        {images.map((i, index) => (
                            <div key={index} className="min-w-full h-[100vh] relative">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}${i.url}`}
                                    alt={`Slide ${index + 1}`}
                                    className="w-full h-full object-contain"
                                    width={i.width}
                                    height={i.height}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="absolute top-10 left-10 bg-background/80 p-4">
                        {`${current + 1} / ${total}`}
                    </div>
                    <div className="absolute top-10 right-10 bg-background/80 p-4">
                        <XMarkIcon className='w-5 h-5 text-white cursor-pointer' onClick={() => onClose()} />
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/70 hover:bg-white text-black p-2 w-10 aspect-square rounded-full shadow-md"
                        onClick={prevSlide}
                    >
                        &#10094;
                    </button>
                    <button
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/70 hover:bg-white text-black p-2 w-10 aspect-square rounded-full shadow-md"
                        onClick={nextSlide}
                    >
                        &#10095;
                    </button>


                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-[200px] px-4">
                        <div className="relative">
                            {/* Fade overlays */}
                            <div className="pointer-events-none absolute top-0 left-0 h-full w-6 bg-gradient-to-r from-black/40 to-transparent z-10" />
                            <div className="pointer-events-none absolute top-0 right-0 h-full w-6 bg-gradient-to-l from-black/40 to-transparent z-10" />

                            {/* Scrollable dots */}
                            <div className="flex overflow-x-auto scrollbar-hide space-x-2 justify-start items-center">
                                {images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrent(index)}
                                        className={`h-2 w-2 shrink-0 rounded-full transition ${current === index ? 'bg-white' : 'bg-white/50'
                                            }`}
                                    ></button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
