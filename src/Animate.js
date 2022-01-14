import { AnimatePresence, motion } from 'framer-motion'

const Animate = (props) => {
   return (
      <AnimatePresence>
         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={props.className}
         >
            {props.children}
         </motion.div>
      </AnimatePresence>
   )
}

export default Animate
