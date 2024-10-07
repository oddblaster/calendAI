import { motion } from 'framer-motion';

const randomYes = () => {
  // Ensure there's enough spacing between cards
  if (Math.random() > 0.5 ){
        return true;
  } else {
    return false;
  }
};

const AnimatedNotes = ({ color, title, description, delay, index }) => {
  return (
    <>
        <motion.div
            style={{ backgroundColor: color }} 
            initial={{ 
                x: '-100vw',  
                y: randomYes() 
                ? -400   // Random position near the top
                : 800    // Random position near the bottom
            }}  
            animate={{ 
                x: ['-100vw', '-50vw', '50vw','100vw'], // First, move quickly to the screen, then move slowly across
                y: randomYes() 
                ? -500 // Animate to a position near the top
                : 800    // Animate to a position near the bottom
            }}
            transition={{
                duration: 30,  // Total duration
                ease: 'linear',
                delay: index * 1.5,
                repeat: Infinity, 
                repeatType: 'reverse',
                times: [0, 0.05, 0.95 ,1],  // 10% of the duration for quick entry, 90% for slow movement
            }}
            className="absolute p-4 text-white rounded-lg shadow-lg"
        >
        <h4 className="font-semibold text-white">{title}</h4>
      </motion.div>
    </>
  );
};

export default AnimatedNotes;