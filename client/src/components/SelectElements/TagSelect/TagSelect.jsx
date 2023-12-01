import React from "react";
import "./TagSelect.scss";
function TagSelect({searchedTags, addTag, setSearchResults, setSearchTerm}) {
  return (
    <div className="tag-select" style={{display:searchedTags.length === 0  ? 'none' : 'block'}}>
      <div className="tag-select__wrap">
        <ul>
          {searchedTags.map(item => (
            <li key={item._id} onClick={() => {
                addTag(item)
                setSearchResults([])
                setSearchTerm('')

            }}>
                <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TagSelect;
