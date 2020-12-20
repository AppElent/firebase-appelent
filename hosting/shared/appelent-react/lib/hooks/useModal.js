import { useState } from 'react';
var useModal = function (initialMode, initialData) {
    if (initialMode === void 0) { initialMode = false; }
    if (initialData === void 0) { initialData = null; }
    var _a = useState(initialMode), modalOpen = _a[0], setModalOpen = _a[1];
    var toggleModal = function () { return setModalOpen(!modalOpen); };
    var _b = useState(initialData), modalData = _b[0], setModalData = _b[1];
    /*
  const setModalState = state => {
    setModalOpen(state)
    if (state === false) {
      setSelected(null)
    }
  }
  */
    //return { modalOpen, setModalOpen, selected, setSelected, setModalState }
    return Object.assign([modalOpen, setModalOpen, toggleModal, modalData, setModalData], {
        modalOpen: modalOpen,
        setModalOpen: setModalOpen,
        toggleModal: toggleModal,
        modalData: modalData,
        setModalData: setModalData,
    });
};
export default useModal;
//# sourceMappingURL=useModal.js.map