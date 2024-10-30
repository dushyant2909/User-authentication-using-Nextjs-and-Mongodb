export default function profilePage({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <div>
      <p className="text-xl font-bold text-red-900">Profile page {id}</p>
    </div>
  );
}
