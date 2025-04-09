import { useEffect } from 'react';

type TUseClose = {
	isFormOpen: boolean;
	onClose: () => void;
	rootRef: React.RefObject<HTMLElement>;
};

export function useClose({ isFormOpen, onClose, rootRef }: TUseClose) {
	useEffect(() => {
		if (!isFormOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
				onClose();
			}
		};

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEscape);
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isFormOpen, onClose, rootRef]);
}
