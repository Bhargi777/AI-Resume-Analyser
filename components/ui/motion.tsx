'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import React from 'react';

export const MotionDiv = motion.div;
export const MotionSection = motion.section;
export const MotionP = motion.p;
export const MotionH1 = motion.h1;
export const MotionH2 = motion.h2;
export const MotionH3 = motion.h3;

export const fadeIn: HTMLMotionProps<'div'> = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
};

export const staggerContainer: HTMLMotionProps<'div'> = {
    initial: 'hidden',
    animate: 'visible',
    variants: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    },
};

export const staggerItem: HTMLMotionProps<'div'> = {
    variants: {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    },
};
