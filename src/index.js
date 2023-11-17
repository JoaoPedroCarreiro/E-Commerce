import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom/client"

import { BrowserRouter, Routes, Route, useParams } from "react-router-dom"

import "bootstrap-icons/font/bootstrap-icons.min.css"

import api from "api"

import App from "components/App"
import Cart from "components/Cart"
import Wishlist from "components/Wishlist"
import PageBase from "components/PageBase"
import CategoriePage from "components/CategoriePage"
import ClothePage from "components/ClothePage"

const root = ReactDOM.createRoot(document.getElementById("root"))

const ValidateUrl = ({ children }) => {
    const [isValid, setIsValid] = useState(null)

    const params = useParams()

    useEffect(() => {
        (async () => {
            let url = ""

            for(const param in params) {
                url += `/${params[param]}`

                const { data } = await api.get(url)

                if(!data) {
                    setIsValid(false)
                    return
                }
            }

            setIsValid(true)
        })()
    }, [params])

    return isValid ? <>{children}</> : (isValid === null) ? <></> : <PageBase />
}

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/">
                <Route index element={<App/>} />
                <Route path="cart" element={<Cart />} />
                <Route path="wishlist" element={<Wishlist />} />
                <Route path=":gender">
                    <Route index element={<ValidateUrl><CategoriePage /></ValidateUrl>} />
                    <Route path=":categorie">
                        <Route index element={<ValidateUrl><CategoriePage /></ValidateUrl>} />
                        <Route path=":id" element={<ValidateUrl><ClothePage /></ValidateUrl>} />
                    </Route>
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>
)