import { create } from 'zustand'
import { type transactionDataSchema } from '@/components/transaction-table/schema';
import transactionData from "@/database/transaction_data.json"

export type transactionDataStoreType = {
    transactionData: transactionDataSchema[];
    addNewTransaction: (newTransaction: transactionDataSchema) => void;
    deleteTransaction: (id: string) => void;
}

export const useTransactionDataStore = create<transactionDataStoreType>((set) => ({
    transactionData: transactionData,

    addNewTransaction: (newTransaction: transactionDataSchema) => { set((state) => ({ transactionData: [...state.transactionData, newTransaction] })) },

    deleteTransaction: (id: string) => { set((state) => ({ transactionData: state.transactionData.filter((e) => e.id !== id) })) }

}));
