import { FunctionComponent, useState } from 'preact/hooks';
import Fmodal from './Fmodal.tsx';
import { senalp } from '../signals.ts';

type ButtonModalProps = {
    film_id: string;
}

export const openSection = (section_id: string) => {
    const section = document.getElementById(section_id);
    if (section) section.style.display = "block";
    else console.log("Section not found");
}

const Modal: FunctionComponent<ButtonModalProps> = ({ film_id }: ButtonModalProps) => {
    const [showModal, setShowModal] = useState<boolean>(false);

    const handleClick = () => {
        setShowModal(true);
        senalp.value = film_id;
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <button className="btn btn-blue" onClick={handleClick}>Add film to project</button>
            {showModal && <Fmodal film_id={film_id} onClose={handleCloseModal} />}
        </>
    );
}

export default Modal;
