import React from "react";
import useReceiptHook from "../hook/receipt.hook";
import TableComponent from "@/component/table/table.component";
import formatDateToLong from "@/shared/format_date_text.shered";
import SelectComponent from "@/component/input/select.component";
import ButtonComponent from "@/component/button/button.component";
import ButtonIconComponent from "@/component/button/button_icon.component";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import useHomeHook from "../hook/home.hook";
import ModalReceiptComponent from "./modal_receipt.component";



export default function ReceiptTableComponent(): React.ReactElement {
    const {
        generateExcel,
        receiptList,
        isLoading, isError,
        header,
        monthOptions,
        yearOptions,
        handleMonthChange,
        handleYearChange,
        totalPayment,
        year,
        month,
        exportIsLoading,
    } = useReceiptHook();

    const {
        ModelOpen,
        AddReceiptError,
        handleCloseModal,
        handleOpenModal,
        register,
        handleFormSubmit,
        errors,
        isSubmitting,
        handleDelete,
        deleteIsLoading,
        editingReceipt,
    } = useHomeHook();

    return (
        <div>
            <div className="flex justify-between items-center">
                <div className=" flex gap-4 mb-5">
                    <SelectComponent labelName="Month" defaultValue={month.toString()} onChange={handleMonthChange} options={monthOptions} />
                    <SelectComponent labelName="Year" defaultValue={year.toString()} onChange={handleYearChange} options={yearOptions} />
                </div>
                <div className="">
                    <ButtonComponent isLoading={exportIsLoading} isDisabled={exportIsLoading} onClick={generateExcel} label="Export" buttonType={"secondary"} />
                </div>
            </div>
            <div className="flex justify-end text-sm mb-2 text-gray-600" >
                <p className="m mr-1"> Total Payment :</p> <b>{totalPayment}</b>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-white shadow-sm">
                <TableComponent
                    isError={isError}
                    isLoading={isLoading}
                    headerList={header}
                    rows={
                        (receiptList ?? []).map(receipt => [
                            formatDateToLong(receipt.date),
                            receipt.typeExpenses,
                            receipt.companyName,
                            receipt.address,
                            receipt.tinNumber,
                            receipt.gross,
                            receipt.netOfVat,
                            receipt.inputTax,
                            receipt.wtax,
                            receipt.payment,
                            receipt.image ? (
                                <a
                                    href={receipt.image}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-xs font-medium text-blue-600 underline"
                                >
                                    View
                                </a>
                            ) : (
                                <span className="text-xs text-zinc-400">No image</span>
                            ),
                            (<div key={receipt.id} className=" flex gap-1">
                                <ButtonIconComponent onClick={() => handleOpenModal(receipt)} icon={<MdModeEdit />} ariaLabel="Edit" />
                                <ButtonIconComponent
                                    onClick={handleDelete(receipt.id)}
                                    isLoading={deleteIsLoading}
                                    isDisabled={deleteIsLoading}
                                    buttonType={"error"}
                                    icon={<MdDelete />}
                                    ariaLabel={"Edit"} />
                            </div>)
                        ])
                    }
                />
            </div>
            <ModalReceiptComponent
                modelOpen={ModelOpen}
                handleCloseModal={handleCloseModal}
                register={register}
                errors={errors}
                handleFormSubmit={handleFormSubmit}
                isSubmitting={isSubmitting}
                addReceiptError={AddReceiptError}
                isEdit={editingReceipt !== null}
            />
        </div>
    );
}