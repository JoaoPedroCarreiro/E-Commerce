import React, { createContext, useEffect, useState } from "react"

import { styled } from "styled-components"

import Nav from "./nav/Nav"
import Logo from "./useful/Logo"
import Search from "./nav/Search"
import RightBar from "./nav/RightBar"
import RightBarItem from "./nav/RightBarItem"
import RightBarItemSearch from "./nav/RightBarItemSearch"
import SubNav from "./sub-nav/SubNav"
import SubNavItem from "./sub-nav/SubNavItem"
import SubNavItemAll from "./sub-nav/SubNavItemAll"
import Footer from "./footer/Footer"
import FooterDiv from "./footer/FooterDiv"
import FooterItem from "./footer/FooterItem"
import api from "api"

const PageBaseContext = createContext(0)

const StyledPageBase = styled.section`
    width: 100%;
    height: 100%;
`

const StyledContent = styled.section`
    width: 100%;
    min-height: calc(100vh);

    box-sizing: content-box;
    
    padding-bottom: var(--footer-height);
`

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

function PageBase({ children }) {
    const [categories, setCategories] = useState({})
    const [wishlistLength, setWishlistLength] = useState(0)
    const [cartLength, setCartLength] = useState(0)

    useEffect(() => {
        (async () => {
            const data = (await api.get("/")).data
            const _wishlistLength = (await api.get("/wishlist")).data.length
            const _cartLength = (await api.get("/cart")).data.length

            const obj = {}

            for(const gender in data) {
                obj[capitalize(gender)] = {}
                obj[capitalize(gender)].index = "/" + gender

                for(const categorie in data[gender]) {
                    obj[capitalize(gender)][capitalize(categorie)] = `/${gender}/${categorie}`
                }
            }

            setCategories(obj)
            setWishlistLength(_wishlistLength)
            setCartLength(_cartLength)
        })()
    }, [])

    return (
        <PageBaseContext.Provider value={{categories: categories, wishlistLength: wishlistLength, setWishlistLength: setWishlistLength, setCartLength: setCartLength}}>
            <StyledPageBase>
                <Nav>
                    <Logo as="link"/>
                    <Search />
                    <RightBar>
                        <RightBarItemSearch />
                        <RightBarItem href="/wishlist" icon="wishlist" length={wishlistLength} />
                        <RightBarItem href="/cart" icon="cart" length={cartLength} />
                    </RightBar>
                </Nav>
                <SubNav>
                    <SubNavItemAll />
                    <SubNavItem key="feminine-categorie" href="/feminine">Feminine</SubNavItem>
                    <SubNavItem key="masculine-categorie" href="/masculine">Masculine</SubNavItem>
                </SubNav>
                <StyledContent>
                    {children}
                </StyledContent>
                <Footer>
                    <FooterDiv mid={true} isTitle={true}>
                        <Logo as="link" />
                    </FooterDiv>
                    <FooterDiv title="Other Websites">
                        <FooterItem href="/" target="_blank">Cherry Login</FooterItem>
                    </FooterDiv>
                    <FooterDiv title="Useful Links">
                        <FooterItem href="/" target="_blank">Portfolio</FooterItem>
                    </FooterDiv>
                    <FooterDiv title="Social">
                        <FooterItem icon="github" href="https://github.com/JoaoPedroCarreiro" target="_blank">Github</FooterItem>
                        <FooterItem icon="linkedin" href="/" target="_blank">Linkedin</FooterItem>
                    </FooterDiv>
                </Footer>
            </StyledPageBase>
        </PageBaseContext.Provider>
    )
}

export { PageBaseContext }
export default PageBase