import Divider from '../extras/divider'

export default function Contact() {
  return (
    // TODO: expand screen beyond one height length so it looks better to scroll though
    <div id="Contact" className="min-h-screen p-6 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
      <Divider />
      <h1 className="text-5xl font-thin tracking-wide">Contact Me</h1>
      <Divider />
      <p>Name, Email, etc</p>
    </div>
  );
}
