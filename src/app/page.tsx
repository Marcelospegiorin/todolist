"use client"

import { listReducer } from "@/reducers/listReducer"
import { useReducer } from "react"
import { Item } from "@/types/Item"
import { useState } from "react"
import { IoPencil, IoTrash } from "react-icons/io5";


export default function Home() {

  const [todo, setTodo] = useState<Item[]>([
    { text: 'Cortar cabelo', id: 0, done: false },
    { text: 'Dormir muito', id: 1, done: true },
    { text: 'Escovar dentes', id: 2, done: true }
  ])

  const [inputValue, setInputValue] = useState<string>('')


  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [editInput, setEditInput] = useState<string>('')
  const [idEdit, setIdEdit] = useState<number>(0);

  const [list, dispatch] = useReducer(listReducer, todo)

  const [inputFocado, setInputFocado] = useState<number | null>(null);

  const handleAddClick = () => {
    if (inputValue) {
      dispatch({
        type: 'add',
        payload: {
          text: inputValue
        }
      })
      setInputValue('');
    }
    return;
  }

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

  const handleInputModal = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditInput(event.target.value);
  }

  const handleDoneCheckbox = (id: number) => {
    dispatch({
      type: 'toggleDone',
      payload: { id }
    });
  }

  const handleEditItem = () => {

    if(editInput.trim() === '') return false;

    dispatch({
      type: 'editText',
      payload: { id: idEdit, newText: editInput }
    });
    setEditInput('')
    setModalOpen(!modalOpen)
  }


  const handleRemoveItem = (id: number) => {
    dispatch({
      type: 'remove',
      payload: {
        id: id
      }
    })
  }


  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-br from-violet-100 to-violet-400/70">
      <div className="w-10/12 h-5/6 bg-slate-200 rounded-lg md:w-4/6 lg:w-2/4 lg:h-4/6 xl:w-2/5 2xl:w-1/4 shadow-2xl flex flex-col max-h-[100vh]">
        <div className="bg-gradient-to-l from-purple-500 to-purple-900 rounded-t-lg px-4 py-3 ">
          <h1 className="text-white text-center text-3xl font-medium">Todo List</h1>
        </div>
        <div className="bg-white w-10/12 mx-auto px-4 py-3 mt-2 items-center justify-center flex shadow-lg rounded-lg flex-col ">
          <input
            className="border-b-2 transition border-b-purple-400 focus:outline-none focus:border-b-purple-800 rounded-sm w-5/6 "
            value={inputValue} placeholder="Oque deseja adicionar?"
            onChange={handleChangeInput}
          />
          <button
            className="bg-purple-500 rounded-md px-4 py-1 mt-4 transition hover:bg-purple-700 text-white"
            onClick={handleAddClick}
          >
            Adicionar
          </button>
        </div>
        <div className="pl-4 pr-4 mt-3 mb-4 max-h-screen overflow-y-auto w-ful">
          {list.map((item, key) => (
            <div className="flex justify-center mb-4" key={item.id}>
              <div className="flex align-middle flex-grow truncate">
                <div className="flex-shrink-0 items-center flex">
                  <input
                    type="checkbox" checked={item.done}
                    onChange={() => handleDoneCheckbox(item.id)}
                    className="w-5 h-5 cursor-pointer"
                  />
                </div>
                <input
                  className="text-black bg-transparent overflow-hidden truncate flex-grow font-normal text-lg ml-3 border transition border-b-purple-400 focus:outline-none focus:border-b-purple-800 rounded-sm w-5/6 "
                  value={item.text}
                  onChange={() => {}}
                />
              </div>
              <div className="flex items-center w-auto h-8">
                <IoPencil size={24} color="black" onClick={() => {setModalOpen(!modalOpen); setIdEdit(item.id)}} className="cursor-pointer" />
                <IoTrash size={24} color="black" onClick={() => handleRemoveItem(item.id)} className="cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
        {modalOpen &&
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="z-10 bg-white p-4 max-w-md rounded shadow-lg flex flex-col items-center">
              <input
                className="border-b-2 transition w-72 border-b-purple-400 focus:outline-none focus:border-b-purple-800 rounded-sm"
                value={editInput}
                onChange={handleInputModal}
              />
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={handleEditItem}
                  className="bg-green-500 w-2/5 hover:bg-green-700 text-white font-bold py-1 px-4 rounded-md justify-center flex"
                >
                  Salvar
                </button>
                <button
                  className="bg-red-500 w-2/4 hover:bg-red-700 text-white font-bold py-1 px-4 rounded-md justify-center flex"
                  onClick={() => setModalOpen(!modalOpen)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        }
      </div>

    </div>
  )
}
