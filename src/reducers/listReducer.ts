import { Item } from "@/types/Item";

type addAction = {
	type: 'add';
	payload: {
		text: string;
	};
}

type editAction = {
	type: 'editText';
	payload: {
		newText: string;
		id: number;
	};
}

type toggleAction = {
	type: 'toggleDone';
	payload: {
		id: number;
	};
}

type removeAction = {
	type: 'remove';
	payload: {
		id: number;
	};
}

type listActions = addAction | editAction | toggleAction | removeAction;

export const listReducer = (list: Item[], action: listActions) => {

	switch(action.type){
		case 'add':
			return [...list, {
				id: list.length,
				text: action.payload.text,
				done: false
			}]
		case 'editText':
			return list.map(item => {
				if (item.id  === action.payload.id){
					item.text = action.payload.newText;
				}
				return item;
			})
		case 'toggleDone':
      return list.map(item => {
        if (item.id === action.payload.id) {
          return { ...item, done: !item.done };
        }
        return item;
      });
		case 'remove':
			return list.filter(item => item.id !== action.payload.id)
		
		default: 
			return list;
	}

}