export function PlaylistListItem({
    userPlaylists,
    index,
    togglePlaylistSelected,
    playlist,
}) {
    return (
        <button
            className={`flex flex-row text-left items-center w-full justify-evenly p-2.5 min-h-min border-b-[1px] border-b-black hover:bg-green-300 hover:transition-colors ${
                userPlaylists[index].selected ? "bg-green-400" : "bg-green-500"
            }`}
            key={index}
            onClick={() => togglePlaylistSelected(playlist)}
        >
            <p className="w-[90%]">{playlist.name}</p>
            <img
                className="object-scale-down w-[10%]"
                src={playlist.images[0]?.url}
            />
        </button>
    );
}
