import Navbar from "./Navbar";
import styled from 'styled-components';
import {motion} from 'framer-motion'


const ProfileImage = styled.div`
    height: 10rem;
    width: 10rem;
    overflow: hidden;
    position: relative;
    border-radius: 50%;
`;

const ProfileSection = styled.div`
    font-size: 2rem;
    margin: 1rem 0 2rem 0;
`



export default function Layout({children}) {
    return (
        <div>
            <div className="navWrapper">
                <motion.div initial="hidden" animate="visible" style={{display: "inline-block"}} variants={{
                        hidden: {
                            scale: .8,
                            opacity: 0
                        },
                        visible: {
                            scale: 1,
                            opacity: 1,
                            transition : {
                                delay: .4
                            }
                        }
                    }}>
                    <ProfileImage>
                            <img src="/face.png" class="rounded" style={{height: "100%", width: "auto", color: "blue", margin: "0 auto", display: "inline"}}/>
                    </ProfileImage>
                </motion.div>

                <div>
                    <ProfileSection>
                        <h1>Simon Beyzerov</h1>
                        <div>
                            <span className="emphHeader">
                                    svbeyzerov [at] wpi.edu
                            </span>
                        </div>
                       
                    </ProfileSection>
                </div>
            </div>
            <Navbar />
            <div className="mainBody">
                {children}
            </div>
        </div>
    );
}