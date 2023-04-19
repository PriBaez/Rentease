namespace SDGAV 
{
    public class OfferDTO 
    {
        public int Id { get; set; }
        public int PropertyId { get; set; }
        public string Username { get; set; } = null!;
        public double Quantity { get; set; }
        public bool Status { get; set; }

    }
}