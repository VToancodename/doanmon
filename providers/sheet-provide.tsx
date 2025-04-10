'use client'

import { useMountedState } from "react-use"

//From Account
import { NewAccountSheet } from "@/features/accounts/components/new-account-sheet"
import { EditAccountSheet } from "@/features/accounts/components/edit-account-sheet"

//From Category
import { NewCategorySheet } from "@/features/categories/components/new-category-sheet"
import { EditCategorySheet } from "@/features/categories/components/edit-category-sheet"

//From Transaction
import { NewTransactionSheet } from "@/features/transactions/components/new-transaction-sheet"
import { EditTransactionSheet } from "@/features/transactions/components/edit-transaction-sheet"

export const SheetProvider = () =>{
    const isMount = useMountedState();

    if(!isMount){
        return null
    }

    return (
        <>
            <NewAccountSheet />
            <EditAccountSheet />

            <NewCategorySheet />
            <EditCategorySheet />

            <NewTransactionSheet />
            <EditTransactionSheet />
        </>
    )
}



