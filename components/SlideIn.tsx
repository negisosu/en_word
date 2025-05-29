"use client"

import { motion, HTMLMotionProps } from "framer-motion"

export function SlideIn({ children, ...props }: HTMLMotionProps<"div">) {
    return(
        <motion.div
        {...props}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        typeof="spring"
        transition={{ delay: 0.5}}
        >
            {children}
        </motion.div>
    )
}