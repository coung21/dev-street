import React, { useState, useEffect } from "react";
import "./InputTags.scss";
import { GrFormClose } from "react-icons/gr";
import TagSelect from "../../SelectElements/TagSelect/TagSelect";
import axios from "axios";

function InputTags({ tags, addTag, removeTag }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchTerm !== "") {
      const delayDebounceFn = setTimeout(() => {
        console.log(searchTerm);
        axios
          .post(`http://localhost:3045/v1/api/tag?query=${searchTerm}`)
          .then((response) => {
            setSearchResults(response.data.data);
          });
      }, 2000);

      return () => clearTimeout(delayDebounceFn);
    } else {
      setSearchResults([])
    }
  }, [searchTerm]);

  return (
    <>
      <div className="tags__input">
        <ul className="input__list">
          {tags &&
            tags.map((tag, index) => (
              <li className="input__item" key={tag._id}>
                <span>#{tag.name}</span>
                <i className="input__remove">
                  <GrFormClose onClick={() => removeTag(index)} />
                </i>
              </li>
            ))}
        </ul>
        <input
          type="text"
          placeholder="Press enter to add tags"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <TagSelect searchedTags={searchResults} addTag={addTag} setSearchResults={setSearchResults} setSearchTerm={setSearchTerm}/>
      </div>
    </>
  );
}

export default InputTags;
