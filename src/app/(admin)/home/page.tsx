"use client";

import ModalReceiptComponent from './component/modal_receipt.component';
import useHomeHook from './hook/home.hook';
import ButtonComponent from '@/component/button/button.component';
import ReceiptTableComponent from './component/receipt_table.component';

function Page(): React.ReactElement {
    const {
        handleOpenModal,
        ModelOpen,
        handleCloseModal,
        register,
        errors,
        handleFormSubmit,
        isSubmitting,
        AddReceiptError
    } = useHomeHook();


    return (
        <>
            <div className="flex flex-col gap-8">
                <header className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 ">
                            Receipt
                        </h1>
                    </div>
                    <ButtonComponent label='Add Receipt' onClick={handleOpenModal} />
                </header>
                <div>
                    <ReceiptTableComponent />
                </div>
            </div>
            <ModalReceiptComponent
                modelOpen={ModelOpen}
                handleCloseModal={handleCloseModal}
                register={register}
                errors={errors}
                handleFormSubmit={handleFormSubmit}
                isSubmitting={isSubmitting}
                addReceiptError={AddReceiptError}
            />
        </>
    );
}

export default Page;
