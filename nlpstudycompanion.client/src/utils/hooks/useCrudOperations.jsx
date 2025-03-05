import { useState } from 'react';

/**
 * Custom hook for performing CRUD operations
 * - Allows you to perform create, modify, and delete operations
 */
export function useCrudOperations({ createMutation, modifyMutation, deleteMutation }) {
    const [loading, setLoading] = useState(false);

    const create = async (data) => {
        setLoading(true);
        try {
            await createMutation(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const modify = async (data) => {
        setLoading(true);
        try {
            await modifyMutation(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const remove = async (data) => {
        setLoading(true);
        try {
            await deleteMutation(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return {
        create,
        modify,
        remove,
        loading,
    };
}
