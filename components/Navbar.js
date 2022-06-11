import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const Nav = styled.nav`
    display: flex;
    flex-direction: row;
    align-items: center;
`;



const StyledLink = styled.a`
text-decoration: none;
    /* padding: 2rem 2rem; */
`;

const NavbarItem = 
    styled.div`
    flex: 1;
    text-align: center;
    padding: 1rem 0rem;
    color: #B0B0B0;
    border-bottom: 2px solid #B0B0B0;
`;

const ListItem = ({ className, children, isActive }) => (
    isActive ? 
        <ActiveListItem className={className}>
        {children}
        </ActiveListItem>
     : 
        <NavbarItem className={className}>
        {children}
        </NavbarItem>
);


const ActiveListItem = styled(NavbarItem)`
    color: black;
`;




let navTabs = require('../pages/pages-tree.json');


const findActiveIndex = (routePath) => {
    for (let i = 0; i < navTabs.length; i++) {
        if (navTabs[i].path == routePath) {
            return i;
        }
    }
    return -1;
}

const SelectionBar = styled.div`
    height: 2px;
    width: ${100 / navTabs.length}%;
    background: black;
    /* top: 100%; */
    position:absolute;
    left: ${props => (findActiveIndex(props.routerPath) * (100 / navTabs.length))}%;
    bottom: 0px;
    transition: 1000ms ease;
    border-radius: 2px;
`;

const Navbar = () => {
    const router = useRouter();
    return (
        <div style={{position:"relative", width: "100%"}}>
            <SelectionBar routerPath={router.pathname}></SelectionBar>
            <Nav>

            {navTabs.map((item,index)=>{

            return <ListItem key={item.title} className="list-class" isActive={router.pathname == item.path}>
                <Link href={item.path} passHref>
                    <StyledLink>{item.title}</StyledLink>
                </Link>
            </ListItem>

            })}
            
            {/* <ListItem className="list-class" isActive={router.pathname == "/contact"}>
                <Link href="/contact" passHref>
                    <StyledLink>Contact</StyledLink>
                </Link>
            </ListItem> */}
        </Nav>
        
        </div>
    )
}

export default Navbar