import { createContext, useState, useContext } from "react";

const CategoryContext = createContext();

export function CategoryProvider( { children } ) {
    const [categories, setCategories] = useState([]);

    return (
        <CategoryContext.Provider value={{ categories, setCategories }}>
            {children}
        </CategoryContext.Provider>
    );
}

export function useCategories() {
    return useContext(CategoryContext);
}