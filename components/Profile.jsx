"use client";
import { getSocialLinks, saveLinks } from "csc-start/utils/data";
import { useEffect, useReducer } from "react";

const Profile = ({ type }) => {
  useEffect(() => {
    const innerGetLinks = async () => {
      const links = await getSocialLinks();
      dispatch({ type: "links", value: links });
    };
    innerGetLinks();
  }, []);

  const initialState = {
    disabled: false,
    addMode: false,
    links: [],
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "originalLinks":
        return { ...state, links: action.value };
      case "links":
        return { ...state, links: action.value };
      case "disabled":
        return { ...state, disabled: action.value };
      case "addMode":
        return { ...state, addMode: action.value };

      case "links":
        return { ...state, links: action.value };
      case "addInputUrl":
        return { ...state, addInputUrl: action.value };
      case "addInputTitle":
        return { ...state, addInputTitle: action.value };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { addMode, disabled, links, addInputUrl, addInputTitle } = state;

  const addItem = (e) => {
    e.preventDefault();
    const linksClone = [...links];
    linksClone.push({
      id: linksClone.length + 1,
      url: addInputUrl,
      title: addInputTitle,
      linkType: type,
      order: linksClone.length + 1,
    });
    dispatch({ type: "links", value: linksClone });
    cancelAdd();
  };

  const cancelAdd = () => {
    dispatch({ type: "addInputUrl", value: "" });
    dispatch({ type: "addInputTitle", value: "" });
    dispatch({ type: "addMode", value: false });
  };

  const save = (e) => {
    e.preventDefault();
    if (!!disabled) {
      return;
    }
    saveLinks(links);
  };

  return (
    <>
      {JSON.stringify(links)}
      <h2 className="text-center h1 my-10">Login</h2>
      <form onSubmit={save}>
        <p className="mb-5 h2 capitalize">{type} Links: </p>
        {Array.isArray(links) && (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>URL</th>
              </tr>
            </thead>
            <tbody>
              {links.map(({ title, url }) => {
                return (
                  <tr key={url}>
                    <td>{title}</td>
                    <td>{url}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {!addMode && (
          <button
            className="button small !h1"
            disabled={disabled}
            onClick={() => dispatch({ type: "addMode", value: true })}
          >
            Add +
          </button>
        )}

        {!addMode && (
          <div className="flex justify-center my-10">
            <input
              className="button small"
              type="submit"
              value="Save"
              disabled={disabled}
            />
          </div>
        )}
      </form>

      {!!addMode && (
        <form onSubmit={addItem} className="p-5 bg-[#CCC] mt-5">
          <p className="h2">Add New URL</p>
          <p className="mb-5">
            <label htmlFor="url" className="w-[150px] inline-block">
              URL:{" "}
            </label>
            <input
              id="url"
              required
              type="url"
              value={addInputUrl}
              className="h3 border-2 border-black inline-block w-[220px]"
              onChange={(e) =>
                dispatch({ type: "addInputUrl", value: e.target.value })
              }
            />
          </p>
          <p className="mb-5">
            <label htmlFor="title" className="w-[150px] inline-block">
              Title
            </label>
            <input
              required
              id="title"
              type="text"
              value={addInputTitle}
              className="h3 border-2 border-black inline-block w-[220px]"
              onChange={(e) =>
                dispatch({
                  type: "addInputTitle",
                  value: e.target.value,
                })
              }
            />
          </p>
          <div className="flex gap-3">
            <input type="submit" className="button small mt-4" value="Add" />
            <input
              type="button"
              onClick={cancelAdd}
              className="button small mt-4"
              value="Cancel"
            />
          </div>
        </form>
      )}
    </>
  );
};

Profile.defaultProps = {
  type: "social",
};

export default Profile;
