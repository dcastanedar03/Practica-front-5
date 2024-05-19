import { FunctionComponent, useState } from 'preact/hooks';
import CreateProject from './CreateProject.tsx';
import AddToProject from './Addtoproject.tsx';
import { useSignal } from "@preact/signals";
import Delete from "./Delete.tsx";
type ButtonModalProps = {
    film_id: string;
};

const Fmodal: FunctionComponent<ButtonModalProps> = ({ film_id }: ButtonModalProps) => {
    

    const [showModal, setModal] = useState(true);
    const signal_reboot = useSignal(false);

    const handleCloseModal = () => {
        setModal(false);
    };

    return (
        <div>
            {showModal && (
                <div id="Modal" class="Modal_container">
                    <div class="modal_content">
                        <span class="close" onClick={handleCloseModal}>&times;</span>
                        <br/><br/>
                        <CreateProject film_id={film_id} reboot={signal_reboot} />
                        <AddToProject film_id={film_id} reboot={signal_reboot} />
                        <Delete film_id={film_id} reboot={signal_reboot} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Fmodal;
