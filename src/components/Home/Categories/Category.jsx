import { useEffect, useState } from "react";
import CategoryItems from "../Categories/CategoryItems"
import apiClient from "../../../services/api-client";

const Category = () => {
    const[categories,SetCategories] =useState([])

    useEffect(()=>{
         apiClient
        .get("/categories")
        .then((res)=>SetCategories(res.data));

    })
    return (
        <section className="py-12 px-28 mx-w-7xl mx-auto">
            <div className="flex  justify-between py-6 items-center" >      
                <h2 className="text-3xl font-bold">Browse Categories</h2>
                <a href="#" className="btn btn-secondary px-6 py-6 text-lg rounded-full">View All</a>
            </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {
                categories.map((category,index)=>(
                    <CategoryItems key={category.id} category={category} index={index}/>
                ))
            }
        </div>
        </section>
    );
};

export default Category;