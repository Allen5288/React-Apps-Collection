import Button from "./Button.jsx";

export default function NoProjectSelected({ onStartAddProject }) {
  return (
    <div className="mt-24 text-center w-2/3">
      <img
        src="https://th.bing.com/th/id/R.c8d4fee72701290767f38676139a88f9?rik=YytBFJgCDyr7CA&riu=http%3a%2f%2faeroarts.co.uk%2fwp-content%2fuploads%2f2019%2f10%2fproject-icon.png&ehk=rWv5g5aiHV0DiI0QcaIPGwZpFT1T4onnOBEoG2nv8SI%3d&risl=&pid=ImgRaw&r=0"
        alt="An empty task list"
        className="w-16 h-16 object-contain mx-auto"
      />
      <h2 className="text-xl font-bold text-stone-500 my-4">
        No Project Selected
      </h2>
      <p className="text-stone-400 mb-4">
        Select a project or get started with a new one
      </p>
      <p className="mt-8">
        <Button onClick={onStartAddProject}>Create new project</Button>
      </p>
    </div>
  );
}
