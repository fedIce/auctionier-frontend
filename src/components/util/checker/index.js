import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Image from 'next/image';
const loaderBlockPath = '/loader_cube.gif';
const loaderSpinPath = '/loader_spin.gif';

export const CheckerAnimation = ({ width = 50, height = 50 }) => {
    return (
        <DotLottieReact
            src="https://lottie.host/e56da998-25e0-45d4-b0ad-c7180a92af99/mFKyR6gHH0.json"
            loop
            autoplay
            style={{ width, height }}
        />
    );
};


export const LoaderBlockAnimation = ({ width = 50, height = 50 }) => {
    return (
        <Image
            src={loaderBlockPath}
            height={height}
            width={width}
            alt='loading image'
        />
    );
};


export const LoaderSpinnerAnimation = ({ width = 50, height = 50, className='' }) => {
    return (
        <Image
            src={loaderSpinPath}
            height={height}
            width={width}
            alt='loading image'
            className={`max-w-fit ${className}`}
        />
    );
}
