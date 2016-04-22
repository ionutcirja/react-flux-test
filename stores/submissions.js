import dispatcher from '../dispatcher'
import Store from './abstract-store'
import * as actionTypes from '../constants/action-types'

let submissions = [];

function findDuplicateSubmission(list, data) {

    return list.map((item) => {
        return item.advertiser + item.brand + item.product;
    }).indexOf(data.advertiser + data.brand + data.product);
}

function addSubmission(list, submission) {

    const duplicateItemIndex = findDuplicateSubmission(list, submission);
    const date = new Date();

    if (!list.length || (list.length && duplicateItemIndex < 0)) {
        return list.concat([Object.assign({}, {...submission, dates: [date.toISOString()]})]);
    }

    const duplicateItem = list[duplicateItemIndex];
    return list
        .slice(0, duplicateItemIndex)
        .concat(Object.assign({}, {...duplicateItem}, {dates: duplicateItem.dates.concat([date.toISOString()])}))
        .concat(list.slice(duplicateItemIndex + 1));
}

dispatcher.register((action) => {

    switch (action.type) {

        case actionTypes.ADD_SUBMISSION:
            submissions = addSubmission(submissions, action.submission);
            SubmissionsStore.emitChange();
            break;
    }
});

const SubmissionsStore = Object.assign({}, Store, {

    getState() {
        return {
            submissions: submissions
        };
    }
});

export default SubmissionsStore;
