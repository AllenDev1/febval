import React from "react";
import CardDesc from "../Components/CardDesc";
import Navbars from "../Components/navbar";
import Footer from "../Components/footer";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const Description = () => {
    const { id, name } = useParams();

    useEffect(() => {}, []);

    return (
        <div>
            <CardDesc id={id} name={name} />
        </div>
    );
};

export default Description;
