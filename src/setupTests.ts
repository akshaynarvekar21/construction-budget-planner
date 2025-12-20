import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.mock('@mui/icons-material', () => ({
    Delete: () => 'DeleteIcon',
    Edit: () => 'EditIcon',
    Add: () => 'AddIcon',
    Close: () => 'CloseIcon',
}));