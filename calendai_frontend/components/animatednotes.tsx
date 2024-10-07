import { motion } from 'framer-motion';

const randomYes = () => {
  // Ensure there's enough spacing between cards
  if (Math.random() >0.5 ){
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
            ? -400   // Randomize between -150px and -100px (near the top)
            : 800    // Randomize between 800px and 850px (near the bottom)
        }}  
        animate={{ 
            x: '100vw', 
            y: randomYes() 
            ? -500 // Animate to a position near the top
            : 800    // Animate to a position near the bottom
        }}  
        transition={{
            duration: 40, 
            ease: 'linear', 
            delay: index * 7, 
            repeat: Infinity, 
            repeatType: 'reverse'  // Reverse the direction after each cycle
        }}
        className="absolute p-4 text-white rounded-lg shadow-lg"
        >
        <h4 className="font-semibold text-white">{title}</h4>
      </motion.div>
    </>
  );
};

export default AnimatedNotes;