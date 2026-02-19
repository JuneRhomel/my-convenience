"use client";
import ButtonComponent from '@/component/button/button.component';
import InputComponent from '@/component/input/input.component';
import InputImgeComponent from '@/component/input/input_imge.component';
import PopupComponent from '@/component/popup/popup.component';
import React from 'react'
import { ReceiptFormState } from '../hook/home.hook';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface ModalReceiptComponentInterfce {
    modelOpen: boolean;
    addReceiptError: string | null;
    handleCloseModal: () => void;
    register: UseFormRegister<ReceiptFormState>;
    handleFormSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
    errors: FieldErrors<ReceiptFormState>;
    isSubmitting: boolean;
    isEdit?: boolean;
}

export default function ModalReceiptComponent({
    modelOpen,
    handleCloseModal,
    register,
    errors,
    handleFormSubmit,
    isSubmitting,
    addReceiptError,
    isEdit = false,
}: ModalReceiptComponentInterfce): React.ReactElement {
    const title = isEdit ? "Edit Receipt" : "Add Receipt";
    return (
        <PopupComponent title={title} isOpen={modelOpen} onClose={handleCloseModal}>
            <form onSubmit={handleFormSubmit} noValidate>
                <div>
                    <InputImgeComponent
                        labelName="Receipt image"
                        register={register("image", {
                            required: isEdit ? false : "Image is required",
                        })}
                        error={errors.image?.message}
                    />
                </div>
                <div className='flex flex-col gap-1 mt-2'>
                    <InputComponent
                        labelName='Date'
                        type='date'
                        {...register("date", { required: true })}
                        error={errors.date?.message}
                    />
                    <InputComponent
                        labelName='Type Expenses'
                        {...register("typeExpenses", { required: true })}
                        error={errors.typeExpenses?.message}
                    />
                    <InputComponent labelName='Company Name'
                        {...register("companyName", { required: true })}
                        error={errors.date?.message} />
                    <InputComponent labelName='Address'
                        {...register("address", { required: true })}
                        error={errors.date?.message}
                    />
                    <InputComponent labelName='Tin Number'
                        {...register("tinNumber", { required: true })}
                        error={errors.date?.message}
                    />
                    <InputComponent labelName='Gross' type='number'
                        {...register("gross", { required: true })}
                        error={errors.date?.message}
                    />
                </div>
                <div>
                    {addReceiptError && (
                        <p className=" text-red-600 text-xs ml-2 mt-2" role="alert">
                            {addReceiptError}
                        </p>
                    )}
                </div>
                <div className='flex  flex-row-reverse gap-1 mt-2'>
                    <ButtonComponent label='Save' type='submit' isDisabled={isSubmitting} isLoading={isSubmitting} />
                    <ButtonComponent label='Cancel' onClick={handleCloseModal} buttonType="secondary" />
                </div>
            </form>
        </PopupComponent>
    )
}
