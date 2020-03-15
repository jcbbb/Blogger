var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(() => {
    const removeFromDOM = (el) => {
        el.closest('.card').remove();
    };
    const deleteButtons = document.querySelectorAll('.card__btn--del');
    deleteButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => __awaiter(this, void 0, void 0, function* () {
            const id = e.target.dataset.id;
            const options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            yield fetch(`/article/delete/${id}`, options);
            yield removeFromDOM(e.target);
        }));
    });
})();
//# sourceMappingURL=index.js.map