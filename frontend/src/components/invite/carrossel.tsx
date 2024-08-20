
import { useState, useEffect, useRef } from 'react'
import styles from './carrossel.module.css'
import { motion } from 'framer-motion';

interface ImageCarouselProps {
    images: string[];
}

export function Carrossel(img: ImageCarouselProps) {

    const carrossel = useRef()
    const [width, setWidth] = useState(0)

    useEffect(() => {
        setWidth(carrossel.current?.scrollWidth - carrossel.current?.offsetWidth)
    }, [])

    return (

        <motion.div
            ref={carrossel}
            className={styles.container}
            whileTap={{ cursor: "grabbing" }}
        >
            <motion.div
                className={styles.inner}
                drag="x"
                dragConstraints={{ right: 0, left: -width }}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 0, opacity: 0 }}
                transition={{ duration: 3 }}
            >

                {img.images.map((image, index) => (

                    <motion.div
                        className={styles.item}
                        key={image}>
                        <img
                            src={image}
                            alt={`slide-${index}`}
                        />

                    </motion.div>

                ))}

            </motion.div>
        </motion.div>

    )
}