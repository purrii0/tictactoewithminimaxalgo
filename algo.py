board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]
def find_first_available_move(board):
    emptycell = []
    for i in range(3):
        for j in range(3):
            if board[i][j] == 0:
                emptycell.append([i, j])
    return emptycell
                

for row in board:
    print(row)

print(find_first_available_move(board))