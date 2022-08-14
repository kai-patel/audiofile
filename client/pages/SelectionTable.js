export default function SelectionTable({
    loading,
    userPlaylists = [],
    songsFromSelected,
    toggleSongCheckbox,
}) {
    return (
        <div className="w-[50%] h-[90%] overflow-y-auto p-0 m-0 border-2 shadow-lg border-gray-800">
            <table className="relative bg-gray-300 shadow-inner border border-gray-800">
                <thead className="sticky top-[-0.25px]">
                    <tr>
                        <th className="border border-gray-800 text-center bg-green-500">
                            Song
                        </th>
                        {!loading
                            ? userPlaylists.map((playlist) => {
                                  if (playlist.selected) {
                                      return (
                                          <th
                                              className="border border-gray-800 text-center bg-green-500"
                                              key={playlist.id}
                                          >
                                              {playlist.name}
                                          </th>
                                      );
                                  }

                                  return null;
                              })
                            : null}
                    </tr>
                </thead>
                <tbody className="border-gray-800 bg-gray-300">
                    {songsFromSelected &&
                        songsFromSelected.map((song, index) => {
                            return (
                                <tr
                                    key={
                                        song.track.name +
                                        song.playlistID +
                                        index
                                    }
                                >
                                    <td className="border border-gray-800 text-center">
                                        {song.track.name}
                                    </td>
                                    {userPlaylists.map((playlist, index) => {
                                        if (playlist.selected) {
                                            return (
                                                <td
                                                    className="border border-gray-800 text-center"
                                                    key={
                                                        song.track.name +
                                                        song.playlistID +
                                                        index
                                                    }
                                                >
                                                    <input
                                                        type="checkbox"
                                                        defaultChecked={song.track.playlistID.includes(
                                                            playlist.id
                                                        )}
                                                        onChange={(e) =>
                                                            toggleSongCheckbox(
                                                                e,
                                                                song,
                                                                playlist
                                                            )
                                                        }
                                                    />
                                                </td>
                                            );
                                        }
                                    })}
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}
