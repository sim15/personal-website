import Layout from '../components/Layout'
import '../styles/globals.css'
import { motion, AnimatePresence, useCycle } from 'framer-motion'
import {SSRProvider} from '@react-aria/ssr'; 


let navTabs = require('../pages/pages-tree.json');

const findIndex = (routePath) => {
    for (let i = 0; i < navTabs.length; i++) {
        if (navTabs[i].path == routePath) {
            return i;
        }
    }
    return -1;
}

var pageIndex = 0;

const updateCurrentIndex = (r) => {
  if (typeof r !== 'undefined') {
    if (typeof r.state !== 'undefined') {
      const oldIndx = pageIndex;
      const newIndx = findIndex(r.state.pathname);
      pageIndex = newIndx;
      // console.log(newIndx + " " + oldIndx)
      if (newIndx > oldIndx) return 1;
      else if (newIndx < oldIndx) return -1;
      else return 0;
    }
  }
  // console.log("nop")
  return 0
}


var allVars = {
  pageInitial: {
      opacity: 1
    },
  pageAnimate: {
      opacity: 1,
      transform: "translateX(0%)"
    },
  slideRight: {
      transform: "translateX(5rem)",
      opacity: 0
  },
  slideLeft: {
      transform: "translateX(-5rem)",
      opacity: 0
  },
  exitFade: {
    opacity: 0
  }
}
let animation = "slideLeft";
var changed = 0;


allVars.slidePrimary = allVars.slideRight;
allVars.slideSecondary = allVars.slideRight;

function MyApp({ Component, pageProps, router }) {
  // const [animation, cycleAnimation] = useCycle("slideLeft", "slideRight")
  // console.log(animation)
  

  const currentAnimation = (r, opening) => {
    const pageChange = updateCurrentIndex(r)

    allVars.slidePrimary = allVars[[
      "slideLeft",
      "slidePrimary",
      "slideRight"
    ][1 + pageChange]]

    allVars.slideSecondary = allVars[[
      "slideRight",
      "slideSecondary",
      "slideLeft"
    ][1 + pageChange]]


    if (opening) {

      
      return "slidePrimary"

    } else {

      
      
      return "slideSecondary"
    }
  }
  return (
    <SSRProvider>
      <Layout>
        <AnimatePresence exitBeforeEnter>
          <motion.div 
          key={router.route} 
          initial={currentAnimation(router, true)} 
          exit={currentAnimation(router, false)} 
          // exit="exitFade" 
          animate="pageAnimate"
          // onAnimationComplete={}
          variants={allVars}
          transition={{ type: "tween", ease: "easeOut", duration: 0.4}}>

            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </Layout>
    </SSRProvider>
  );
}

export default MyApp;
