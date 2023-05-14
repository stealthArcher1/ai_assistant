import { useEffect, useState } from 'react';

import { HiOutlineXMark } from 'react-icons/hi2';

import Button from '@/components/Button';
import { Input, Textarea } from '@/components/InputField';
import ModalWrapper from '@/components/Modal';
import { useKeyPress } from '@/hooks/useKeyPress';
import { Role } from '@/types';
import { addOrEditRole } from '@/utils/roles';

interface Props {
    isOpen: boolean;
    toggleModal: () => void;
    role?: Role;
}
const RoleEditor = (props: Props) => {
    const [title, setTitle] = useState<string>(props.role ? props.role.roleName : '');
    const [prompt, setPrompt] = useState<string>(props.role ? props.role.prompt : '');
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(e.target.value);
    };

    const handleClickSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addOrEditRole(prompt, title, props.role);
        setTitle('');
        setPrompt('');
        props.toggleModal();
    };
    const handleClickClose = () => {
        setTitle('');
        setPrompt('');
        props.toggleModal();
    };
    useKeyPress(handleClickClose, ['Escape']);

    return (
        <ModalWrapper isOpen={props.isOpen} toggleModal={props.toggleModal}>
            <div
                onClick={(e) => e.stopPropagation()} // prevent modal from closing
                className="absolute flex h-[60vh] w-full max-w-lg flex-col space-y-3 overflow-hidden rounded-xl bg-light-bg p-6 text-left shadow-xl dark:bg-dark-bg"
            >
                <div className="flex justify-between">
                    <span className=" text-2xl text-gray-500 dark:text-gray-400">
                        {props.role ? 'Edit Role' : 'Add Role'}
                    </span>
                    <Button
                        size="lg"
                        Icon={HiOutlineXMark}
                        onClick={handleClickClose}
                        shadow={true}
                    />
                </div>
                <form onSubmit={(e) => handleClickSave(e)}>
                    <div>
                        <label className="text-base text-light-text dark:text-dark-text">
                            Title
                        </label>
                        <Input
                            value={title}
                            onChange={handleTitleChange}
                            required={true}
                            placeholder="Title"
                            type="text"
                        />

                        <label className="text-base text-light-text dark:text-dark-text ">
                            Prompt Insturction
                        </label>
                        <Textarea
                            required={true}
                            value={prompt}
                            onChange={handlePromptChange}
                            placeholder="Prompt"
                            rows={10}
                        />
                    </div>
                    <Button size="lg" type={'submit'} shadow={true} border={true} text="Save" />
                </form>
            </div>
        </ModalWrapper>
    );
};
export default RoleEditor;
