import React from "react";
import Todo from "../Todo";

function Content_layout() {
  return (
    <div className="p-10 mt-[50px] w-full h-[100vh] flex justify-between">
     <Todo name="TO-DO" addCardTrue={true} />
     <Todo name="In Process"/>
     <Todo name="Finished"/>
    </div>
  );
}

export default Content_layout;
