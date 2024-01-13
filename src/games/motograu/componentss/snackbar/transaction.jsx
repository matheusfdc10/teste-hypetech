export default function Transaction({
  amount,
  cashed_out_at,
  index,
}) {
  return (
    <div
      className="absolute border-green-600 rounded-lg top-4 z-50"
      style={{ top: `${index == 0 ? 20 : 30 + 80 * index}px` }}
    >
      <section
        className={
          'bg-green-500 rounded-lg text-gray-200'
        }
        role="alert"
      >
        <div className="flex items-center p-3">
          <div className="d-flex flex-column text-center items-center mr-4">
            {/* <div className="text-base sm:text-xl">
              <strong>Você saiu com</strong>
            </div> */}
            <strong className="text-xl sm:text-4xl">
              {parseFloat(cashed_out_at).toFixed(2)}x
            </strong>
          </div>

          <div
            className={
              'd-flex flex-column items-center text-center px-4 py-3 bg-green-700 rounded-lg'
            }
          >
            <div className="font-bold text-base sm:text-2xl">Você ganhou</div>
            <strong className="text-white text-base sm:text-2xl">
              R$ {parseFloat(amount * cashed_out_at).toFixed(2)}
            </strong>
          </div>
        </div>
      </section>
    </div>
  )
}
